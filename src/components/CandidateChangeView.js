
import React, {Component} from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import UserService from "../services/user.service";



class CandidateChangeView extends Component {


  constructor(props) {
    super(props);
    this.state = {
        cards: [],
        id:0
      }
    }

  componentDidMount(){
    UserService.getCandidateView()
    .then(
            response => {
    console.log("test")
    console.log(response.data[0].corder)
        
  const card = JSON.parse(response.data[0].corder)
  console.log(card)
    this.setState({
      cards:card,
      id:response.data[0].id
      // userimg:"http://reecho-frontend.s3-website-eu-west-1.amazonaws.com/users/"+response.data[0].userimg,
      // hearabout:response.data[0].hearabout,
      // surpriseme:response.data[0].seekingstatus === 'surprise me' ? true:false,
      // email:response.data[0].email,
      // phone:response.data[0].phone
    })
          
            },
            error => {
              console.log(error)
            }
          );
  }




  // state = {
  //   items: ['Suprise With', 'Proud Of', 'Next Achievement', 'Education', 'Experience', 'Benefit'],
  // };
  onSortEnd = ({oldIndex, newIndex}) => {
    
    this.setState({
      cards: arrayMove(this.state.cards, oldIndex, newIndex),
    });
console.log("changing it")
console.log(JSON.stringify(this.state.cards))
console.log("done it")
    UserService.updateCandidateView(JSON.stringify(this.state.cards), this.state.id).then(
      response => {
console.log(response.data)

      },
      error => {
        console.log(error)
      }
    );




    console.log(
      JSON.stringify(this.state.cards)
    )
  };
  render() {


    const SortableItem = SortableElement(({value,SortableItemClassName}) =>
  <li className={SortableItemClassName}>{value}</li>
);

const SortableList = SortableContainer(({items,SortableItemClassName}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} SortableItemClassName={SortableItemClassName} />
      ))}
    </ul>
  );
});


    return <SortableList items={this.state.cards} onSortEnd={this.onSortEnd} SortableItemClassName={this.props.SortableItemClassName} />;
  }
}

export default CandidateChangeView