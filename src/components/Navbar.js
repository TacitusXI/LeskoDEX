import React, {Component} from 'react'
import { connect } from 'react-redux'
import { accountSelector } from '../store/selectors'
import logo from '../images/lesko.png' 
import { DEMO_MODE } from '../config'



class Navbar extends Component{
  render(){
    return(
      <>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ position: 'relative' }}>
            <a className="navbar-brand" href="#/"><img src={logo} width="127" height="32" alt=""></img>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            {/* Demo Mode Badge - Compact */}
            {DEMO_MODE && (
              <div style={{
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '4px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                marginRight: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 6px rgba(102, 126, 234, 0.4)',
                whiteSpace: 'nowrap'
              }}>
                <span role="img" aria-label="Demo Mode" style={{ fontSize: '14px' }}>🎭</span>
                <span>DEMO MODE</span>
              </div>
            )}
            
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a
                   className="nav-link small" 
                   href={`https://etherscan.io/address/${this.props.account}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   >
                   {this.props.account}
                   </a>
                </li>
              </ul>
             </nav>
      </>
          )
  }
}

function mapStateToProps(state){
  return{
    account: accountSelector(state)
  }
}
export default connect(mapStateToProps)(Navbar);

