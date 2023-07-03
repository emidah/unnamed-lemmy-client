import './App.scss'
import useSWR from 'swr';
import { createClient } from './lemmy-client/client';
import type { LemmyClient } from './lemmy-client/client';
import PostList from './components/postList';

function getClient(): LemmyClient {
	return createClient("http://localhost:3000");
}

async function getPosts() {
	const client = getClient();
	return await client.getPosts();
}

function App() {
	const { data, error, isLoading } = useSWR("mainPosts", getPosts);
	if (isLoading)
		return <><h2>Loading... 
			<span className="material-symbols-outlined spin">
				progress_activity
			</span>
		</h2></>
	if (error) {
		console.error(error);
		return <> <h2>Received error from lemmy.world! Retrying in a few seconds...</h2></>
	}

	const posts = PostList(data!.posts);
	return (
		<>
			<div>
				{posts}
			</div>
		</>
	)
}

export default App
