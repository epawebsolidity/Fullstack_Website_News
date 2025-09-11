import React from "react";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Login from "@/pages/login";
import Registrasi from "@/pages/Registrasi";
import News from "@/pages/News";
import DetailNews from "@/pages/DetailNews";
import Documentation from "@/pages/Documentation";
import About from "@/pages/About";
import Profile from "@/pages/Profile";
import CreateNews from "@/pages/CreateNews";
import PrivateRoute from "@/utils/PrivateRoute";
import { Role } from "@/utils/Role";
import Notice from "@/pages/Notice";
import Users from "@/pages/Users";
import ConfirmationNews from "@/pages/ConfirmationNews";

const routes = [
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/news",
    element: (
      <Layout>
        <News />
      </Layout>
    ),
  },
  {
    path: "/signin",
    element: <Login />,
  },

  {
    path: "/pengguna",
    element: (
      <PrivateRoute allowRoles={[Role.Admin]}>
        <Layout>
          <Users />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/signup",
    element: <Registrasi />,
  },
  {
    path: "/detailnews/:id",
    element: (
      <Layout>
        <DetailNews />
      </Layout>
    ),
  },
  {
    path: "/dosc",
    element: (
      <Layout>
        <Documentation />
      </Layout>
    ),
  },
  {
    path: "/about",
    element: (
      <Layout>
        <About />
      </Layout>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute allowRoles={[Role.Users, Role.Admin]}>
        <Layout>
          <Profile />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/createnews",
    element: (
      <PrivateRoute allowRoles={[Role.Users, Role.Admin]}>
        <Layout>
          <CreateNews />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/konfirmasiberita",
    element: (
      <PrivateRoute allowRoles={[Role.Admin]}>
        <Layout>
          <ConfirmationNews />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/notice",
    element: (
      <PrivateRoute allowRoles={[Role.Users, Role.Admin]}>
        <Layout>
          <Notice />
        </Layout>
      </PrivateRoute>
    ),
  },
];

export default routes;
