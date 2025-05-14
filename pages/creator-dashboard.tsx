import connectToDatabase from "@/lib/db";
import Creator from "@/models/Creator";

export async function getServerSideProps() {
  await connectToDatabase();
  const creators = await Creator.find({}).lean();

  return {
    props: {
      creators: JSON.parse(JSON.stringify(creators)),
    },
  };
}

export default function CreatorDashboard({ creators }) {
  return (
    <div>
      <h1>Creator Dashboard</h1>
      <ul>
        {creators.map((c) => (
          <li key={c._id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}

