import './App.css';
import React, { useEffect, useState , ReactDOM } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import reactMarkdown from 'react-markdown';
import ReactMarkdown from 'react-markdown';

function IssueDetails(){

    const [ commentsUrl, setCommentsUrl ] = useState("");
    const [ commentsData, setCommentsData ] = useState([]);
    const [ commentsLoading, setCommentsLoading ] = useState(false);
    const [ issueDetails, setIssueDetails ] = useState({});
    const [ detailsLoading, setDetailsLoading ] = useState(false);
    const { issuenumber } = useParams();
    const { reponame } = useParams();

    useEffect(() => {
        getIssueDetails({});
        renderIssue(issueDetails);
    },[issueDetails]);

    function getIssueDetails(){
        setDetailsLoading(true);
        var issueurl = 'https://api.github.com/repos/'+reponame+'/issues/'+issuenumber;
        console.log(issueurl);
        setCommentsUrl(issueurl);
        axios.get(issueurl).then(res=>{
            console.log(res.data);
            setDetailsLoading(false);
            setIssueDetails(res.data);
        });
    }

    function renderIssue(issueDetails){
        return(
            <div>
                <div className="details-row">
                <label className="label">Issue Number:</label>
                <span className="value">{issueDetails.number}</span>
            </div>
            <div className="details-row">
                <label className="label">Status:</label>
                <span className="value">{issueDetails.state}</span>
            </div>
            <div className="details-row">
                <label className="label">Comments:</label>
                <span className="value">{issueDetails.comments}</span>
            </div>
            <div className="details-row">
                <label className="label">Title:</label>
                <span className="value">{issueDetails.title}</span>
            </div>
            <div className="details-row">
                <button type="submit" class="btn btn-primary" 
                   onClick={getComments}>
                        <h6 className="">
                            Get Comments
                        {/* {repo.title} */}
                        </h6>
                </button>
            </div>
            </div>
        );
    }
    
    function getComments(){
        setCommentsLoading(true);
        var commentsurl;
        commentsurl = commentsUrl+'/comments';
        axios.get(commentsurl).then(res=>{
            setCommentsLoading(false);
            setCommentsData(res.data);
            console.log(res.data);
            const comData = commentsData.body;
        });
    }

    function renderComments(commentsData){
        return(
          <div className="row" key={commentsData.number}>
                <h6 className="comments-data-container">
                ReactDOM.render(<ReactMarkdown></ReactMarkdown>,documnet.body.comments-data-container)
                </h6>
          </div>
        );
      }

    // if(loading){
    //     return(
    //         <h1 className="loader">Loading...</h1>
    //     )
    // }

    return(
        <div className="repo-details-container">
            {renderIssue(issueDetails)}
        </div>
    );
}

export default IssueDetails;