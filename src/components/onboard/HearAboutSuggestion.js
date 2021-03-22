// import {COUNTRIES} from './countries';
import { WithContext as ReactTags } from 'react-tag-input';
import React, { Component, Fragment} from 'react';
import TagService from "../../services/tag.service";
const reducer = (accumulator, currentValue) => accumulator + currentValue;


  
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  
  
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  

  class HearAboutSuggestion extends Component{
    constructor(props) {
        super(props);

        let edittags
if(this.props.editList){
      edittags = this.props.editList.split(",").map(tag=>{
          const container = {};
          container.id = tag;
          container.text = tag;
          return container
        })
      }

    this.state = {
        tags:this.props.editList?edittags:[],
        // tags: [{ id: 'Thailand', text: 'Thailand' }, { id: 'India', text: 'India' }],
        suggestions: [],

        obj_length:[]
      };
      this.handleDelete = this.handleDelete.bind(this);
      this.handleAddition = this.handleAddition.bind(this);
      this.handleDrag = this.handleDrag.bind(this);
      this.handleTagClick = this.handleTagClick.bind(this);
    }


    componentDidMount() {
  
      TagService.getAllTags().then(
        response => {

          const suggestions = response.data.map((text) => {
            return {
              id: `${text.id}` ,
              text: text.title
            }
          })
          // console.log(response.data)
          this.setState({
            suggestions: suggestions
          });
        },
        error => {
          this.setState({
            suggestions:
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
          });
        }
      );
      }



    handleDelete(i) {
        const { tags } = this.state;

        // const new_tags = this.state.tags.filter((tag, index) => index !== i)

        this.state.tags.splice(i, 1);
        // this.setState({
        //   tags: tags.filter((tag, index) => index !== i),
        // });

        this.setState({tags:tags })

        let array_length =this.state.tags.map(obj =>obj.text.length)

        let total_length = 0

        if(array_length.length!==0){
          total_length = array_length.reduce(reducer)
        }

      console.log(this.state.tags)
      console.log(total_length)

      if(this.props.tagtype!=="admin"){
        // this.props.addHearAbout(this.state.tags)


        this.props.updateRemaining(total_length)



  }
      }
    
      handleAddition(tag) {
        // this.setState(
        //     { tags: [...this.state.tags, tag] }
        //   )




        // TagService.createHearabout(tag.text).then(
        //   response => {
  
            
        //     console.log("this is"+response.data)
         
        //   }).catch((error) => {
        //     console.log(error);
        //     });

        // const reducer = (accumulator, currentValue) => accumulator + currentValue;


        
       

        this.state.tags.push(tag)

        let array_length =this.state.tags.map(obj =>obj.text.length)

        const total_length = array_length.reduce(reducer)

        console.log(this.state.tags)
        console.log(total_length)



    
        // console.log(this.state.obj_length)

       this.setState({ tags: this.state.tags });

      //  console.log(tag)
    //    this.setState(state =>{state.tags.push(tag)})
      //  console.log(this.state.tags)
      //  if(this.props.tagType === 'hearabout'){
        
// alert(this.props.tagtype)

  if(this.props.tagtype==="general"){
        this.props.addHearAbout(this.state.tags)


        this.props.updateRemaining(total_length)


  }

  if(this.props.tagtype==="edit"){
    this.props.updateHearAbout(this.state.tags)

  }




      //  }else if(this.props.tagType === 'job'){
      //  this.props.addJobExperience(this.state.tags)
      //  }else if(this.props.tagType === 'anythingImportant'){
      //   this.props.addAnythingImportant(this.state.tags)
      //   }

      }
    
      handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
    
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
    
        // re-render
        this.setState({ tags: newTags });

          if(this.props.tagtype!=="admin"){
            this.props.addHearAbout(this.state.tags)
          }
   
    }
    
      handleTagClick(index) {
        console.log('The tag at index ' + index + ' was clicked');
      }

      render(){
        const { tags, suggestions } = this.state;
        return(
            <ReactTags className="tags"
            tags={tags}
            autofocus = {false}
            suggestions={suggestions}
            delimiters={delimiters}
            handleDelete={this.handleDelete}
            handleAddition={this.handleAddition}
            handleDrag={this.handleDrag}
            handleTagClick={this.handleTagClick}
            placeholder="add new words and press enter"
          />
        )
      }


  }

  export default HearAboutSuggestion;