import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import NoResults from "../components/NoResults";
import VideoCard from "../components/VideoCard";
import { BASE_URL } from '../utils';

export default function Home({ videos }) {
  console.log(videos);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex flex-col gap-10  h-full">
          {videos.length ? (
            videos?.map((video) => (
              <VideoCard post={video} isShowingOnHome key={video._id} />
            ))
          ) : (
            <NoResults text={`No Videos`} />
          )}
        </div>
      </main>
    </div>
  );
}
export const getServerSideProps = async ({
  query: { topic },
}) => {
  let response = await axios.get(`${BASE_URL}/api/post`);

  if(topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }
  
  return {
    props: { videos: response.data },
  };
};
