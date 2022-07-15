
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
export class News extends Component{
    static defaultProps={
        country:'in',
        category:'general',
    }


    static propTypes={
        country:PropTypes.string,
        category:PropTypes.string,
    }

constructor(props){
    super (props);
this.state={
    articles:[],
    loading: false,
    page:1
    
}}

   async componentDidMount(){
       let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=927e7b0d8a4b4de8a61c1994df0a7e28&page=1&pageSize=20`;
       let data=await fetch(url);
       let parsedData=await data.json()
       console.log(parsedData);
       this.setState({articles:parsedData.articles})
   }


   handlePrevClick= async()=>
{
    console.log("Previous")
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=927e7b0d8a4b4de8a61c1994df0a7e28&page=${this.state.page+1}&pageSize=20`;
let data=await fetch(url);
let parsedData=await data.json()
console.log(parsedData);
this.setState( {
    page: this.state.page-1,
    articles:parsedData.articles

})


}

handleNextClick=async()=>
{
console.log("Next");
let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=927e7b0d8a4b4de8a61c1994df0a7e28&page=${this.state.page-1}&pageSize=20`;
let data=await fetch(url);
let parsedData=await data.json()
console.log(parsedData);
this.setState( {
    page: this.state.page+1,
    articles:parsedData.articles

})

}


render(){
    return(
         <div className="container my-3">
             <h1 className="text-center" style={{marginTop:'30px'}}>NewsCat-Top Headlines</h1>
              
             <div className="row">
             {this.state.articles.map((element)=>{
                 return <div className ="col-md-4" key= {element.url}>
                     <NewsItem title={element.title?element.title:""} description ={element.description?element.description:""} imageUrl=
                      {element.urlToImage} newsUrl={element.url}/>
                 </div>
})}
</div>
                    <div className="container d-flex justify-content-between">
                        
                  <button disabled={this.state.page<=1}type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                  <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                  
             </div>
         </div>
        )
             }
             }

export default News