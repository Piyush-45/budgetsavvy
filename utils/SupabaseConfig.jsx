// password---budgetsavvy03!


import { createClient } from '@supabase/supabase-js'
import { client } from './KindeConfig';

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://cyauhavkhxeyznrmmmwa.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5YXVoYXZraHhleXpucm1tbXdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ3NTA2NjIsImV4cCI6MjAzMDMyNjY2Mn0.6Jru6o0eKS_ZJE_yRbNoR33G6vaBDkTbdcC03aIakfM')


const getCategoryList = async () => {
  const user = await client.getUserDetails();
  const { data, error } = await supabase
    .from('Category')
    .select('*')
    // .eq('name', user.id); // assuming you want to filter categories by the current user

  if (error) {
    console.error('Error fetching categories:', error);
  } else {
    console.log('Category data:', data);
  }
};


