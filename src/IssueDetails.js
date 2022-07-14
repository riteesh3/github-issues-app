import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";

function IssueDetails(){

    const [ commentsLoading, setCommentsLoading ] = useState(false);
    const [ issueDetails, setIssueDetails ] = useState({});
    const [ detailsLoading, setDetailsLoading ] = useState(false);
    const { repoone, repotwo,issuenumber } = useParams();
    const [commentString, setCommentString] = useState("");
    
    useEffect(() => {
        getIssueDetails({});
    },[]);

    function getIssueDetails(){
        setDetailsLoading(true);
        var issueurl = 'https://api.github.com/repos/'+repoone+'/'+repotwo+'/issues/'+issuenumber;
        axios.get(issueurl).then(res=>{
            setDetailsLoading(false);
            setIssueDetails(res.data);
        });
    }

    function renderIssue(issueDetails){
        return(
            <div>
                <div className="details-row issue-preview">
                <label className="label"><b> Issue Number : </b></label>
                <span className="value">{"  " +issueDetails.number}</span>
            </div>
            <div className="details-row issue-preview">
                <label className="label"><b> Status : </b></label>
                <span className="value">{"  " + issueDetails.state}</span>
            </div>
            <div className="details-row issue-preview">
                <label className="label"><b> Comments : </b></label>
                <span className="value">{"  " + issueDetails.comments}</span>
            </div>
            <div className="details-row issue-preview-title">
                <label className="label"><b> Title : </b></label>
                <span className="value">{"  " + issueDetails.title}</span>
            </div>
            <br></br>
            <div className="details-row">
                <button type="submit" class="fetch-button" 
                   onClick={getComments}>
                            Get Comments
                </button>
            </div>
        </div>
        );
    }
    
    function getComments(){
        setCommentsLoading(true);
        var commentsurl;
        let newcomment;
        commentsurl = 'https://api.github.com/repos/'+repoone+'/'+repotwo+'/issues/'+issuenumber+'/comments';
        axios.get(commentsurl).then(res=>{
            var num =0;
            res.data.forEach(element => {
                newcomment += "<br/>" +"<h3>"+ ++num+"."+"</h3>"+" "+element.body+"<br/>";
            });
            setCommentString(newcomment.slice(9));
            setCommentsLoading(false);
        }).catch(function (error) {
            if (error.response) {
                console.log(error);
            }
        });
    }

    function renderComments(){
        return(
          <div className="row">
                <p className="comments-data-container">
                <ReactMarkdown remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]}>{commentString}</ReactMarkdown>
                </p>
          </div>
        );
      }

    return(
        <div>
        <div className="repo-details-container">
            {renderIssue(issueDetails)}
        </div>
        <div className="comments-section">
            {renderComments()}
            </div>
        </div>
    );
}

export default IssueDetails;