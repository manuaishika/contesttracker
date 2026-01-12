-- CP Hub Database Setup
-- Run this SQL in your Supabase SQL Editor

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create linked_platforms table
CREATE TABLE IF NOT EXISTS linked_platforms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL,
  username TEXT NOT NULL,
  rating INTEGER,
  rank TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, platform)
);

-- Create contest_reminders table
CREATE TABLE IF NOT EXISTS contest_reminders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  contest_id TEXT NOT NULL,
  contest_name TEXT NOT NULL,
  platform TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  url TEXT,
  notified BOOLEAN DEFAULT FALSE,
  notification_method TEXT DEFAULT 'app', -- 'app', 'email', 'both', 'sms', 'push'
  reminder_time_before INTEGER DEFAULT 60, -- minutes before contest
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, contest_id)
);

-- Create user_notification_preferences table
CREATE TABLE IF NOT EXISTS user_notification_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email_notifications BOOLEAN DEFAULT true,
  app_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT false,
  sms_notifications BOOLEAN DEFAULT false,
  default_reminder_time INTEGER DEFAULT 60, -- minutes before contest
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create contest_favorites table
CREATE TABLE IF NOT EXISTS contest_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  contest_id TEXT NOT NULL,
  contest_name TEXT NOT NULL,
  platform TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, contest_id)
);

-- Create user_statistics table
CREATE TABLE IF NOT EXISTS user_statistics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  total_contests INTEGER DEFAULT 0,
  contests_participated INTEGER DEFAULT 0,
  average_rank INTEGER,
  best_rank INTEGER,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE linked_platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE contest_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE contest_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_statistics ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Admin can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Create policies for linked_platforms
CREATE POLICY "Users can view their own linked platforms"
  ON linked_platforms FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own linked platforms"
  ON linked_platforms FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own linked platforms"
  ON linked_platforms FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own linked platforms"
  ON linked_platforms FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for contest_reminders
CREATE POLICY "Users can view their own reminders"
  ON contest_reminders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reminders"
  ON contest_reminders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reminders"
  ON contest_reminders FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reminders"
  ON contest_reminders FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for contest_favorites
CREATE POLICY "Users can view their own favorites"
  ON contest_favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites"
  ON contest_favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own favorites"
  ON contest_favorites FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
  ON contest_favorites FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for user_statistics
CREATE POLICY "Users can view their own statistics"
  ON user_statistics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own statistics"
  ON user_statistics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own statistics"
  ON user_statistics FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policies for user_notification_preferences
ALTER TABLE user_notification_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notification preferences"
  ON user_notification_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own notification preferences"
  ON user_notification_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notification preferences"
  ON user_notification_preferences FOR UPDATE
  USING (auth.uid() = user_id);

-- Enable RLS for user_settings
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for user_settings
CREATE POLICY "Users can view their own settings"
  ON user_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings"
  ON user_settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings"
  ON user_settings FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, is_admin)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    false
  );
  
  INSERT INTO public.user_statistics (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call function on new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS update_linked_platforms_updated_at ON linked_platforms;
CREATE TRIGGER update_linked_platforms_updated_at
  BEFORE UPDATE ON linked_platforms
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- To set yourself as admin, run this after creating your account:
-- UPDATE profiles SET is_admin = true WHERE id = 'your-user-id-here';
