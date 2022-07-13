import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

function IssueDetails(){

    const [ commentsUrl, setCommentsUrl ] = useState("");
    const [ commentsData, setCommentsData ] = useState([]);
    const [ commentsLoading, setCommentsLoading ] = useState(false);
    const [ issueDetails, setIssueDetails ] = useState({});
    const [ detailsLoading, setDetailsLoading ] = useState(false);
    const { repoone, repotwo,issuenumber } = useParams();
    const [commentString, setCommentString] = useState("");
    // ReactDOM.render(<ReactMarkdown>{commentString}</ReactMarkdown>, document.getElementById("comments-section"))

    useEffect(() => {
        getIssueDetails({});
    },[]);

    function getIssueDetails(){
        setDetailsLoading(true);
        var issueurl = 'https://api.github.com/repos/'+repoone+'/'+repotwo+'/issues/'+issuenumber;
        setCommentsUrl(issueurl);
        axios.get(issueurl).then(res=>{
            setDetailsLoading(false);
            setIssueDetails(res.data);
        });
    }

    function renderIssue(issueDetails){
        return(
            <div>
                <div className="details-row issue-preview">
                <label className="label">Issue Number:</label>
                <span className="value">{issueDetails.number}</span>
            </div>
            <div className="details-row issue-preview">
                <label className="label">Status: </label>
                <span className="value">{issueDetails.state}</span>
            </div>
            <div className="details-row issue-preview">
                <label className="label">Comments: </label>
                <span className="value">{issueDetails.comments}</span>
            </div>
            <div className="details-row issue-preview-title">
                <label className="label">Title: </label>
                <span className="value">{issueDetails.title}</span>
            </div>
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
                newcomment += " \n \n" + "<  " + ++num+"."+"   >"+" "+element.body+". \n \n";
            });
            setCommentString(newcomment);
            console.log(commentString);
            setCommentsLoading(false);
            setCommentsData(res.data);
        });
    }

    function renderComments(){
        return(
          <div className="row">
                <p className="comments-data-container">
                <ReactMarkdown remarkPlugins={[gfm]}>{commentString}</ReactMarkdown>
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