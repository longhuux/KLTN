
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeeklyPlanView from '@/components/meal-planning/WeeklyPlanView';
import DailyPlanView from '@/components/meal-planning/DailyPlanView';

const MealPlanning = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("weekly");

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Meal Planning</h1>
        <p className="text-muted-foreground mb-6">
          Create personalized meal plans by selecting recipes for each day of the week. 
          Track nutritional information and plan your meals in advance.
        </p>
        
        <Tabs defaultValue="weekly" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="weekly">Weekly Plan</TabsTrigger>
            <TabsTrigger value="daily">Daily Plan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="mt-6">
            <WeeklyPlanView />
          </TabsContent>
          
          <TabsContent value="daily" className="mt-6">
            <DailyPlanView />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MealPlanning;
