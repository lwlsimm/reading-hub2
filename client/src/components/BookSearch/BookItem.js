import {addSelectedBookFromSearch, addSelectedMyBook} from "../../store/actions";
import { useDispatch } from "react-redux";

export default function BookItem(props) {

    const dispatch = useDispatch();
    const data = props.bookData;

    let image = ' ./defaultSmallBook.png';

    if("images" in data) {
        if("thumbnail" in data.images) {
            image = data.images.thumbnail
        }
    }

    const handleSelect = () => {
        if(props.mode === 'search')dispatch(addSelectedBookFromSearch(data));
        if(props.mode === 'myBooks')dispatch(addSelectedMyBook(data));
    };

    return(
        <div className="bookItem overlay"
             onClick={handleSelect}
        >
            <div className="bookItemTextContainer">
                <small className="innerBookText">{data.title}</small><br/>
                <small className="innerBookText">{data.author}</small>
            </div>
            <div style={{backgroundImage: `url(${image})`}} className="innerBookItem">

            </div>

        </div>
    )
}