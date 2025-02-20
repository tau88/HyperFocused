import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { motion } from "framer-motion";

import ToolIconTemplate from "./ToolIconTemplate";

const HomePage: React.FC = () => {
  return (
    <div
      style={{ paddingLeft: "20px" }}
      className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1
          style={{ marginBottom: "-10px" }}
          className="text-4xl font-bold text-gray-900"
        >
          Welcome to HyperFocused!
        </h1>
        <p>Tools for organization, keeping on task, and more!</p>
      </motion.div>

      <div
        style={{ paddingBottom: "10px" }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <ToolIconTemplate
          title="Pomodoro Tool"
          desc="The Pomodoro Technique is a time management method to break work into intervals."
          color="dd6677"
        />
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">Feature 2</h2>
            <p className="text-gray-600 mt-2">
              Seamless integration with your favorite apps.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">Feature 3</h2>
            <p className="text-gray-600 mt-2">
              Secure and reliable for all your needs.
            </p>
          </CardContent>
        </Card>
      </div>

      <Button
        variant="contained"
        className="mt-6 px-6 py-3 text-lg rounded-2xl bg-blue-600 hover:bg-blue-700 text-white"
      >
        Get Started
      </Button>
    </div>
  );
};

export default HomePage;
