import React, { Component } from 'react';



import Dishdetail from '../DishdetailComponent';
import Menu from '../MenuComponent';
import HeaderComponent from '../HeaderComponent';
import FooterComponent from '../FooterComponent';
import { Switch, Route, Redirect,withRouter } from 'react-router-dom';
import Home from '../HomeComponent';
import Contact from '../ContactComponent';
import About from '../AboutComponent';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}


class Main extends Component {

    constructor(props) {
      super(props);
     
    }
  

   
 
    render() {

      const HomePage = () => {
        return(
          <Home 
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
      />
        );
      }
    
      const DishWithId= ({match}) =>{
       return( <Dishdetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
       comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />)
      }

      return (
        <div>
         <HeaderComponent />

         <Switch>
         <Route path='/home' component={HomePage} /> 
         //<Route path='#' component={About} />         
         <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
         <Route path='/menu/:dishId' component={DishWithId} />
         <Route exact path='/contactus' component={Contact} />
         <Redirect to="/home" />
     </Switch>

        
          
          <FooterComponent />
        </div>
      );
    }
  }
  
  // <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
  // <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />

  export default withRouter(connect(mapStateToProps) (Main));