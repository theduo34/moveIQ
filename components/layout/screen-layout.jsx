import { useRootNavigationState, useSegments } from "expo-router";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabNav } from "./tab-nav";

const ScreenLayout = (
  {
    children,
    screen,
    showNavbar = true,
    navbarTitle,
    showBack,
    onBackPress,
    navbarLeftContent,
    navbarRightContent,
    navbarVariant,
    scrollable = true,
    className = "",
  }) => {
  const segments = useSegments();
  const rootState = useRootNavigationState();

  const isInsideTabs = segments.includes("(tabs)");
  const rootStackCount = rootState?.routes?.length ?? 1;

  const resolvedShowBack =
    showBack !== undefined
      ? showBack
      : isInsideTabs
        ? rootStackCount > 1
        : true;

  const inner = (
    <View className={`flex-1 flex-col ${className}`}>
      {children}
    </View>
  );

  const content = scrollable ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
    >
      {inner}
    </ScrollView>
  ) : (
    inner
  );

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <View className="flex-1" id={screen}>
        {showNavbar && (
          <TabNav
            title={navbarTitle}
            showBack={resolvedShowBack}
            onBackPress={onBackPress}
            leftContent={navbarLeftContent}
            rightContent={navbarRightContent}
            variant={navbarVariant}
          />
        )}
        <View className="p-4 flex-1"  style={{ backgroundColor: "#003838" }}>
          {content}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScreenLayout;