export default function CreateAnswer() {
    function handleClick(e) {
        e.preventDefault();
        
    }
    return(
        
            <form>
            <div class="form-group">
               <input type="text" id = "answer" class="form-control" placeholder="Answer" />
               <button class="btn btn-primary" onClick={handleClick}>Post</button>
            </div>
         </form>
        
    )
}