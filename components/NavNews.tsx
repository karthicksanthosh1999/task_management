"use client";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import useNews from "@/app/context/hooks/useNews";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "./ui/button";

const NavNews = () => {
  const { newsEnable, snowfallEnable, toggleNews, toggleSnowFall } = useNews();

  return (
    <Card className={cn(newsEnable ? "block" : "hidden")}>
      <CardContent>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium">🌟 Winter Mode is Here!</h1>
          <Button variant="ghost" onClick={toggleNews} className="cursor-pointer">
            <X />
          </Button>
        </div>

        <Separator className="my-2" />

        <p className="text-sm font-normal tracking-wider antialiased">
          The chilly season has arrived, and so has our beautiful new Winter Mode! We’ve completely refreshed the look and feel of the app, bringing you a cozy, elegant theme designed for the months ahead. Explore exclusive new features, vibrant winter visuals, and improved functionality that makes using your favorite app a delight, even on the coldest days. Head to Settings and switch to Winter Mode today to experience the magic!
        </p>

        <div className="flex items-center space-x-2 mt-5">
          {/* Use global state directly */}
          <Switch
            id="airplane-mode"
            className="cursor-pointer"
            checked={snowfallEnable}
            onCheckedChange={toggleSnowFall}
          />
          <Label htmlFor="airplane-mode">Winter Mode</Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default NavNews;
