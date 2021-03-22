// import {COUNTRIES} from './countries';
import { WithContext as ReactTags } from 'react-tag-input';
import React, { Component, Fragment} from 'react';
import TagService from "../../services/tag.service";


  
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  

  class SkillSuggestion extends Component{
    constructor(props) {
        super(props);


    this.state = {
        tags:[],
        // tags: [{ id: 'Thailand', text: 'Thailand' }, { id: 'India', text: 'India' }],
        suggestions: [],
      };
      this.handleDelete = this.handleDelete.bind(this);
      this.handleAddition = this.handleAddition.bind(this);
      this.handleDrag = this.handleDrag.bind(this);
      this.handleTagClick = this.handleTagClick.bind(this);
    }


    componentDidMount() {
  
      TagService.getSkillTags().then(
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
        this.setState({
          tags: tags.filter((tag, index) => index !== i),
        });
      }
    
      handleAddition(tag) {
        // this.setState(
        //     { tags: [...this.state.tags, tag] }
        //   )




        TagService.createSkillTag(tag.text).then(
          response => {
  
            
            console.log("this is"+response.data)
         
          }).catch((error) => {
            console.log(error);
            });


        this.state.tags.push(tag)
       this.setState({ tags: this.state.tags });
      //  console.log(tag)
    //    this.setState(state =>{state.tags.push(tag)})
      //  console.log(this.state.tags)
      if(this.props.tagtype!=="admin"){
       this.props.addJobExperience(this.state.tags)
      }

      }
    
      handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
    
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
    
        // re-render
        this.setState({ tags: newTags });
        if(this.props.tagtype!=="admin"){
         this.props.addJobExperience(this.state.tags)
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

  export default SkillSuggestion;