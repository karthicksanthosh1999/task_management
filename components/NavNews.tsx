"use client";

import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

const NavNews = () => {
  const [] = useState(true);
  return (
    <>
      <Card>
        <CardContent>
          <h1 className="text-lg font-medium">What's new?</h1>
          <Separator className="my-2" />
          <p className="text-xs font-normal">
            Our application is now got the winter update ☃️. Let's celebrate the
            new year to use{" "}
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default NavNews;
