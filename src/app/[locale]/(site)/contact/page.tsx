import { DesktopContactPage } from "@/components/site/contact/DesktopContactPage";
import { MobileContactPage } from "../(mobile)/contact/MobilePage";
import ResponsiveRoute from "../_routing/ResponsiveRoute";

export default async function Page() {
  return (
    <ResponsiveRoute
      desktop={<DesktopContactPage />}
      mobile={<MobileContactPage />}
    />
  );
}
