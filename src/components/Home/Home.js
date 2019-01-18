import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            searchedValue:'',
            moviesName:[],
            index:1,
            showDiv:true,
            movieData:[]
             
        }
    }
    getResponse =(val ,pageNo) =>{
        axios.get(`http://www.omdbapi.com/?s=${val}&apikey=5ce2c41a&page=${pageNo}`)
        .then(res =>{
            var list =res.data;
            this.setState({
                showDiv:true,
                moviesName:list.Search,
                movieData:list.Search
            })
        })
    }
    nameEntered = (e) =>{
        this.setState({
            // selectedData :null,
            index:1
        })
        var val = (e.target.value).charAt(0).toUpperCase() + (e.target.value).slice(1);
        this.setState({
            searchedValue : val 
        });

        this.getResponse(this.state.searchedValue ,this.state.index);
        
    }
    yearEntered =(e) =>{
        var newList = this.state.moviesName;

        if(this.state.searchedValue === ''){
            alert('Please enter movie name first');
            e.target.value = '';
        }
        var year = e.target.value;
        var newData = newList.filter( item => {
            if(item.Year === year)
            return item;
        });
        if(newData.length){
            this.setState({
                moviesName:newData
            })
        }
        else if(year === ''){
            this.setState({
                moviesName:this.state.movieData
            },()=>{
            });
        }
        else{
            this.setState({
                moviesName:this.state.movieData
            },()=>{
            });
        }
    }
    pageUp =()=>{
         this.setState({
             index :this.state.index + 1,
            //  selectedData :null
         });
         this.getResponse(this.state.searchedValue ,this.state.index);
         
    }
    pageDown =() =>{
        this.setState({
            index :this.state.index - 1,
            // selectedData :null

        });
        this.getResponse(this.state.searchedValue ,this.state.index);
    }

    movieSelected =(val)=>{
         const newVal = val;
        this.setState({
            showDiv:false,
            selectedData:newVal
        });
        
    }
    render() {
        const {searchedValue, index, moviesName, showDiv} =this.state;
        var descendingData = moviesName && (moviesName.sort((a,b)=>{return b.Year - a.Year}));
        return (
            <div>
                <div className="heading">
                    <h1>MovieMania</h1>
                </div>
                <div className="jumbotron jumbotron-fluid jumbo-container">
                    <div className="container jumbo-data">
                        <div className="col-sm-12 jumbo-data-left">
                            <h1 className="display-jumbo-heading">Search For Movies</h1>
                            <input className="search-box" type="text" onChange={this.nameEntered} />
                            { showDiv 
                             &&
                            <div className="moviesList-items">
                                <ul>
                                    {
                                   (descendingData &&
                                    descendingData.length > 0 )?
                                    descendingData.map((item,index) =>{
                                          return(
                                            //   <li onClick={()=>{this.movieSelected(item)}}>
                                                <li>
                                                  {item.Title} <img src={item.Poster} key={index}/>
                                                </li>
                                          )
                                      })
                                      :( searchedValue !== ''
                                      && descendingData === undefined &&
                                      <div>
                                          <h4 style={{fontFamily:'Lucida Console, Courier, monospace',color:'yellow',textAlign:'center'}}>Movie Not Found,Try with other Name</h4>
                                      </div>
                                    )   
                                    }
                                </ul>
                            </div>
                             }
                        </div>
                        <div className="col-sm-12 jumbo-data-right">
                            <h1 className="display-jumbo-heading">Year</h1>
                            <input className="search-box" type="text" onChange={this.yearEntered}/>
                        </div>
                    </div>
                </div>

                {   
                showDiv &&
                <div className="grid-modal" style={{clear: 'both'}}>
                    <div className="row">
                    { (descendingData &&
                      descendingData.length > 0) ?
                      descendingData.map((item,index)=>{
                          return(
                            <div key ={index} className="col-sm-12 col-md-6 col-lg-3 image-style">
                                <div className="gallery-modal">
                                    <div>
                                        <img src={item.Poster} alt="Avatar" style={{width:270,height:400,border:'5px solid white'}} />
                                        <div className="container">
                                            <p style={{fontFamily:'Lucida Console, Courier, monospace',color:'#e84118',textAlign:'left',marginBottom:5}}><b>{item.Title}</b></p> 
                                            <p style={{fontFamily:'Lucida Console, Courier, monospace',color:'#e84118',textAlign:'left'}}>{item.Year}</p> 
                                        </div>
                                    </div>
                                </div>
                            </div>    
                          )
                      })
                      :''
                    }
                    </div>
                </div>
                }
                {/* {
                   selectedData &&
                    <div className="col-sm-12 col-md-12 col-lg-12 single-card">
                        <div className="card">
                            <img src={selectedData.Poster} alt="Avatar" style={{maxWidth:'100%',maxHeight:'100%',borderRadius:10}} />
                            <div className="container">
                                <h4><b>{selectedData.Title}</b></h4> 
                                <p>Year :{selectedData.Year}</p> 
                            </div>
                        </div>    
                    </div>
                } */}
                {
                   moviesName &&
                   index > 0 && 
                    <button type="button" className="btn btn-primary" onClick ={this.pageDown}>Previous Page</button>

                }
                {
                   moviesName &&
                   <button type="button" className="btn btn-primary" onClick ={this.pageUp}>Next Page</button>
                }
            </div>
        );
    }
}

export default Home;