import "../../public/plugins/fontawesome-free/css/all.min.css";
import "../../public/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css";
import "../../public/dist/css/adminlte.min.css";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="hold-transition sidebar-mini layout-fixed">
        <div className="wrapper">
          <Navbar />
          <Sidebar />
          <div className="content-wrapper">

            <section className="content">
              <div className="container-fluid">
                My Content
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
