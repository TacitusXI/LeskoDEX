import React, {Component} from 'react'
import { connect } from 'react-redux'
import { accountSelector } from '../store/selectors'
import logo from '../images/lesko.png' 
import { DEMO_MODE } from '../config'



class Navbar extends Component{
  render(){
    return(
      <>
        {/* Demo Mode Banner */}
        {DEMO_MODE && (
          <div style={{
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '12px 20px',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 1000,
            position: 'relative'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <span style={{ fontSize: '20px' }} role="img" aria-label="Demo Mode">🎭</span>
              <span>
                <strong>DEMO MODE</strong> - This is a static demonstration of LeskoDEX interface. 
                All data is simulated for portfolio purposes.
              </span>
              <span style={{ 
                background: 'rgba(255,255,255,0.2)', 
                padding: '4px 12px', 
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                No Blockchain Connection
              </span>
            </div>
          </div>
        )}
        
        <nav className="navbar navbar-expand-lg navbar-dark">
            <a className="navbar-brand" href="#/"><img src={logo} width="127" height="32" alt=""></img>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
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

