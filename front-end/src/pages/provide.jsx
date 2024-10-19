import { useState } from "react";
const Provide = () => {
    const [posts, setPosts] = useState(Array([]));
    const examplePost = [
        { subject: 'Math', topic: 'Second order diffrential equations', id: 1, relevance: 2 }, //addsuitability score maybe???
        { subject: 'English', topic: 'I need someone to help me understand hamlet',id: 2, relevance:3 },
        { subject: 'Physics', topic: 'I do not understand the calculus behind kinematics',id: 3, relevance:1},
    ];
    
    function organizeposts(){
        setPosts(examplePost);
        //const sortedPosts = [...posts].sort((a,b)=> {
       //     return a.first > b.first ? 1:-1
       // })
       // setPosts(sortedPosts);
    }
    return(
        <div>
           <div>
            <button onClick={organizeposts}>Load Posts</button>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <strong>{post.subject}:</strong> {post.topic} {post.relevance}
                    </li>
                ))}
            </ul>
        </div>
           
        </div>
    );
};

export default Provide;