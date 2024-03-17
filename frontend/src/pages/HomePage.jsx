import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";


import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import Spinner from "../components/Spinner";

const HomePage = () => {

	const [userProfile, setUserProfile] = useState(null);
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);

	const [sortType, setSortType] = useState("recent");


	const getUserProfileAndRepos = useCallback(async () => {
		setLoading(true);
		try {
			const userRes = await fetch("https://api.github.com/users/burakorkmez");
			const userProfile = await userRes.json();
			setUserProfile(userProfile);

			const repoRes = await fetch(userProfile.repos_url);
			const repos = await repoRes.json();
			setRepos(repos);

			console.log("userProfile : ", userProfile);
			console.log("repos : ", repos);
			
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	}, [])

	useEffect(() => {
		getUserProfileAndRepos();
	}, [getUserProfileAndRepos]);


	return (
		<div className='m-4'>
			<Search />
			<SortRepos />
			<div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
				{/* <ProfileInfo userProfile = {userProfile} />
				<Repos />
				<Spinner /> */}

				{userProfile && !loading && <ProfileInfo userProfile={userProfile} />}

				{!loading && <Repos repos={repos} />}
				{loading && <Spinner />}
			</div>
		</div>
	);
};

export default HomePage;