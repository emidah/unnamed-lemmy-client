import './App.scss'
import { getClient } from './lemmy-client/client';
import PostList from './components/postList/PostList';
import { Outlet } from "react-router-dom";

function App() {
	const client = getClient();
	const { data, error, isLoading } = client!.getMainPosts(1);
	if (!data || isLoading)
		return <><h2>
			<span className="material-symbols-outlined spin">
				progress_activity
			</span> Loading... 
		</h2></>
	if (error) {
		console.error(error);
		return <> <h2>Received error from lemmy.world! Retrying in a few seconds...</h2></>
	}

	const posts = PostList(data!.posts);
	return (
		<div className='side-by-side-container'>
			<div className='side-by-side-list'>
				{posts}
			</div>
			<div className='side-by-side-post'>
				<Outlet />
			</div>
		</div>
	)
}

export default App
