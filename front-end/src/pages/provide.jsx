import { useState } from "react"; //FIX POSTS
const Post = ({subject, topic}) =>{
    return(
        <>
            <div className = 'bg-lightsage rounded-md shadow-lg text-black w-8/12 ml-auto mr-auto my-10 p-5'>
                <h3 className ='font-poppins'>{subject}</h3>
                <p>{topic}</p>
            </div>
        </>
    );
}

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
    const postsButReal = posts.map((post,index) =>(
        <li key={post.id || index}>
        <Post subject = {post.subject} topic = {post.topic}/>
        </li>
    ));
    return(
        <div className ='bg-center'>
            <div className = 'mt-32'>
           <Post subject = "math" topic = "i hate math"/>
           </div>
           <ul>{postsButReal}</ul>
        </div>
    );
};

export default Provide;