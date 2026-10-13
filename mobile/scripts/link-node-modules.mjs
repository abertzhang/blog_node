// 由于本仓库使用 pnpm node-linker=hoisted，所有依赖扁平装在仓库根 node_modules。
// React Native 的 Gradle 插件（@react-native/gradle-plugin）会被 android/settings.gradle
// 按 npm 风格路径 mobile/node_modules/... 引用，hoisted 下该目录默认不存在，导致构建报
// "Included build '.../mobile/node_modules/@react-native/gradle-plugin' does not exist"。
// 这里把 mobile/node_modules 软链到根 node_modules，一次性解决 Gradle 解析问题。
import { existsSync, lstatSync, symlinkSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const mobileDir = resolve(here, ".."); // mobile/
const target = "../node_modules"; // 相对 mobile/ 指向仓库根 node_modules
const linkPath = resolve(mobileDir, "node_modules");

try {
  if (existsSync(linkPath)) {
    const st = lstatSync(linkPath);
    if (st.isSymbolicLink()) {
      console.log("[postinstall] mobile/node_modules 已是软链，跳过");
      process.exit(0);
    }
    // 是真实目录（pnpm hoisted 模式下不应存在）则删除后重建软链
    rmSync(linkPath, { recursive: true, force: true });
  }
  symlinkSync(target, linkPath, "dir");
  console.log("[postinstall] 已软链 mobile/node_modules -> ../node_modules");
} catch (e) {
  console.warn("[postinstall] 软链失败（可忽略，一般不影响 Gradle 解析）:", e.message);
}
