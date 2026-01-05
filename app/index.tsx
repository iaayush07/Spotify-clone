import { Redirect } from "expo-router";

export default function Index() {
  console.log("index layout");
  return <Redirect href="/home" />;
}
