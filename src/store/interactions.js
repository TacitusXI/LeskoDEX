import Web3 from "web3";
import {
  web3Loaded,
  web3AccountLoaded,
  tokenLoaded,
  exchangeLoaded,
  cancelledOrdersLoaded,
  filledOrdersLoaded,
  allOrdersLoaded,
  orderCancelling,
  orderCancelled,
  orderFilling,
  orderFilled,
  etherBalanceLoaded,
  tokenBalanceLoaded,
  exchangeEtherBalanceLoaded,
  exchangeTokenBalanceLoaded,
  balancesLoaded,
  balancesLoading,
  buyOrderMaking,
  sellOrderMaking,
  orderMade,
} from "./actions";
import Token from "../abis/ESKO.json";
import Exchange from "../abis/LESKOdex.json";
import { ETHER_ADDRESS } from "../helpers";
import { CONTRACT_ADDRESSES } from "../config";

export const loadWeb3 = async (dispatch) => {
  if (typeof window.ethereum !== "undefined") {
    const web3 = new Web3(window.ethereum);
    dispatch(web3Loaded(web3));
    return web3;
  } else {
    window.alert("Please install MetaMask");
    window.location.assign("https://metamask.io/");
  }
};

export const loadAccount = async (web3, dispatch) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  dispatch(web3AccountLoaded(account));
  return account;
};

export const loadToken = async (web3, networkId, dispatch) => {
  try {
    let tokenAddress;
    
    // Check if we have a predefined address for this network
    if (CONTRACT_ADDRESSES[networkId]) {
      tokenAddress = CONTRACT_ADDRESSES[networkId].Token;
    } else if (Token.networks && Token.networks[networkId]) {
      // Fall back to ABI network address for local development
      tokenAddress = Token.networks[networkId].address;
    } else {
      throw new Error("Token contract not deployed to detected network.");
    }
    
    const token = new web3.eth.Contract(
      Token.abi,
      tokenAddress
    );
    dispatch(tokenLoaded(token));
    return token;
  } catch (error) {
    console.log(
      "Contract not deployed to the current network. Please select another network with Metamask.",
      error
    );
    window.alert("Token contract not deployed to detected network. Please connect to a supported network.");
    return null;
  }
};

export const loadExchange = async (web3, networkId, dispatch) => {
  try {
    let exchangeAddress;
    
    // Check if we have a predefined address for this network
    if (CONTRACT_ADDRESSES[networkId]) {
      exchangeAddress = CONTRACT_ADDRESSES[networkId].Exchange;
    } else if (Exchange.networks && Exchange.networks[networkId]) {
      // Fall back to ABI network address for local development
      exchangeAddress = Exchange.networks[networkId].address;
    } else {
      throw new Error("Exchange contract not deployed to detected network.");
    }
    
    const exchange = new web3.eth.Contract(
      Exchange.abi,
      exchangeAddress
    );
    dispatch(exchangeLoaded(exchange));
    return exchange;
  } catch (error) {
    console.log(
      "Contract not deployed to the current network. Please select another network with Metamask.",
      error
    );
    window.alert("Exchange contract not deployed to detected network. Please connect to a supported network.");
    return null;
  }
};

export const loadAllOrders = async (exchange, dispatch) => {
  // Fetch cancelled orders with the "Cancel" event stream
  const cancelStream = await exchange.getPastEvents("OrderCancelled", {
    fromBlock: 0,
    toBlock: "latest",
  });
  // Format cancelled orders
  const cancelledOrders = cancelStream.map((event) => event.returnValues);
  // Add cancelled orders to the redux store
  dispatch(cancelledOrdersLoaded(cancelledOrders));

  // Fetch filled orders with the "Trade" event stream
  const tradeStream = await exchange.getPastEvents("OrderFilled", {
    fromBlock: 0,
    toBlock: "latest",
  });
  // Format filled orders
  const filledOrders = tradeStream.map((event) => event.returnValues);
  // Add cancelled orders to the redux store
  dispatch(filledOrdersLoaded(filledOrders));

  // Load order stream
  const orderStream = await exchange.getPastEvents("OrderCreated", {
    fromBlock: 0,
    toBlock: "latest",
  });
  // Format order stream
  const allOrders = orderStream.map((event) => event.returnValues);
  // Add open orders to the redux store
  dispatch(allOrdersLoaded(allOrders));
};

export const subscribeToEvents = async (exchange, dispatch) => {
  exchange.events.OrderCancelled({}, (error, event) => {
    dispatch(orderCancelled(event.returnValues));
  });

  exchange.events.OrderFilled({}, (error, event) => {
    dispatch(orderFilled(event.returnValues));
  });

  exchange.events.Deposit({}, (error, event) => {
    dispatch(balancesLoaded());
  });

  exchange.events.Withdraw({}, (error, event) => {
    dispatch(balancesLoaded());
  });

  exchange.events.OrderCreated({}, (error, event) => {
    dispatch(orderMade(event.returnValues));
  });
};

export const cancelOrder = (dispatch, exchange, order, account) => {
  exchange.methods
    .cancelOrder(order.id)
    .send({ from: account })
    .on("transactionHash", (hash) => {
      dispatch(orderCancelling());
    })
    .on("error", (error) => {
      console.log(error);
      window.alert("There was an error!");
    });
};

export const fillOrder = (dispatch, exchange, order, account) => {
  exchange.methods
    .fillOrder(order.id)
    .send({ from: account })
    .on("transactionHash", (hash) => {
      dispatch(orderFilling());
    })
    .on("error", (error) => {
      console.log(error);
      window.alert("There was an error!");
    });
};

export const loadBalances = async (
  dispatch,
  web3,
  exchange,
  token,
  account
) => {
  if (typeof account !== "undefined") {
    // Ether balance in wallet
    const etherBalance = await web3.eth.getBalance(account);
    dispatch(etherBalanceLoaded(etherBalance));

    // Token balance in wallet
    const tokenBalance = await token.methods.balanceOf(account).call();
    dispatch(tokenBalanceLoaded(tokenBalance));

    // Ether balance in exchange
    const exchangeEtherBalance = await exchange.methods
      .balanceOf(ETHER_ADDRESS, account)
      .call();
    dispatch(exchangeEtherBalanceLoaded(exchangeEtherBalance));

    // Token balance in exchange
    const exchangeTokenBalance = await exchange.methods
      .balanceOf(token.options.address, account)
      .call();
    dispatch(exchangeTokenBalanceLoaded(exchangeTokenBalance));

    // Trigger all balances loaded
    dispatch(balancesLoaded());
  } else {
    window.alert("Please login with MetaMask");
  }
};

export const depositEther = (dispatch, exchange, web3, amount, account) => {
  exchange.methods
    .depositEther()
    .send({ from: account, value: web3.utils.toWei(amount, "ether") })
    .on("transactionHash", (hash) => {
      dispatch(balancesLoading());
    })
    .on("error", (error) => {
      console.error(error);
      window.alert(`There was an error!`);
    });
};

export const withdrawEther = (dispatch, exchange, web3, amount, account) => {
  exchange.methods
    .withdrawEther(web3.utils.toWei(amount, "ether"))
    .send({ from: account })
    .on("transactionHash", (hash) => {
      dispatch(balancesLoading());
    })
    .on("error", (error) => {
      console.error(error);
      window.alert(`There was an error!`);
    });
};

// export const depositToken = (dispatch, exchange, web3, token, amount, account) => {
//   amount = web3.utils.toWei(amount, 'ether')

//   token.methods.approve(exchange.options.address, amount).send({ from: account })
//   .on('transactionHash', (hash) => {
//     exchange.methods.depositToken(token.options.address, amount).send({ from: account })
//     .on('transactionHash', (hash) => {
//       dispatch(balancesLoading())
//     })
//     .on('error',(error) => {
//       console.error(error)
//       window.alert(`There was an error!`)
//     })
//   })
// }

export const depositToken = async (
  dispatch,
  exchange,
  web3,
  token,
  amount,
  account
) => {
  amount = web3.utils.toWei(amount, "ether");

  await token.methods
    .approve(exchange.options.address, amount)
    .send({ from: account });

  await exchange.methods
    .depositToken(token.options.address, amount)
    .send({ from: account });

  setTimeout(1000);

  await dispatch(balancesLoading());
};

export const withdrawToken = (
  dispatch,
  exchange,
  web3,
  token,
  amount,
  account
) => {
  exchange.methods
    .withdrawToken(token.options.address, web3.utils.toWei(amount, "ether"))
    .send({ from: account })
    .on("transactionHash", (hash) => {
      dispatch(balancesLoading());
    })
    .on("error", (error) => {
      console.error(error);
      window.alert(`There was an error!`);
    });
};

export const makeBuyOrder = (
  dispatch,
  exchange,
  token,
  web3,
  order,
  account
) => {
  const tokenGet = token.options.address;
  const amountGet = web3.utils.toWei(order.amount, "ether");
  const tokenGive = ETHER_ADDRESS;
  const amountGive = web3.utils.toWei(
    (order.amount * order.price).toString(),
    "ether"
  );

  exchange.methods
    .makeOrder(tokenGet, amountGet, tokenGive, amountGive)
    .send({ from: account })
    .on("transactionHash", (hash) => {
      dispatch(buyOrderMaking());
    })
    .on("error", (error) => {
      console.error(error);
      window.alert(`There was an error!`);
    });
};

export const makeSellOrder = (
  dispatch,
  exchange,
  token,
  web3,
  order,
  account
) => {
  const tokenGet = ETHER_ADDRESS;
  const amountGet = web3.utils.toWei(
    (order.amount * order.price).toString(),
    "ether"
  );
  const tokenGive = token.options.address;
  const amountGive = web3.utils.toWei(order.amount, "ether");

  exchange.methods
    .makeOrder(tokenGet, amountGet, tokenGive, amountGive)
    .send({ from: account })
    .on("transactionHash", (hash) => {
      dispatch(sellOrderMaking());
    })
    .on("error", (error) => {
      console.error(error);
      window.alert(`There was an error!`);
    });
};

