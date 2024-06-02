import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import ConnectForm from "@/ui/connect-form";

export default function Page() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Configure Typesense Connection</CardTitle>
          <CardDescription>
            Fill in the details below to connect to your Typesense server
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ConnectForm />
        </CardContent>
      </Card>
    </div>
  );
}
