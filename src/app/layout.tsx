import { UserProvider, useUser } from "../contexts/userContext";

export const metadata = {
  title: "gridz",
  description: "Create grids and show off your taste!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
          <UserProvider>
            {children}
          </UserProvider>
      </body>
    </html>
  );
}
