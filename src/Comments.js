export default function Comments(props) {
  const comments = props.comments;
  
  return (
    <>
    
      {comments.map((comment) => {
        return (
          <div className="card d-flex justify-content-between" key={comment.id}>
            <div>{comment.user}: "{comment.body}"</div>
            <div>{comment.timestamp}</div>
            
          </div>
        );
      })}
    </>
  );
}
