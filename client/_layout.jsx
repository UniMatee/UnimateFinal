import { Stack, useRouter } from 'expo-router/stack';
import React from 'react';

export default function Layout() {

  return (
    <Stack>
      <Stack.Screen name="tabs" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  );
}
