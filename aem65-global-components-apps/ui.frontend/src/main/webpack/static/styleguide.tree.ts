import { treeConfig, PunkBranch } from '../styleguide/framework/AEMPUnkTree/punk-tree';

// ---------- Categories ----------------
// treeConfig.addCategory(new PunkBranch("documentation"));
treeConfig.addCategory(new PunkBranch("layouts"));
treeConfig.addCategory(new PunkBranch("content"));
treeConfig.addCategory(new PunkBranch('atoms'));
treeConfig.addCategory(new PunkBranch('molecules'));
treeConfig.addCategory(new PunkBranch("organisms"));
treeConfig.addCategory(new PunkBranch("utilities"));
treeConfig.addCategory(new PunkBranch("example pages"));

// ---------- Viewports ----------------
treeConfig.addViewPort("iPhone5s", "Small mobile", 320, 480);
treeConfig.addViewPort("iPhoneXS", "Large mobile", 480, 768);
treeConfig.addViewPort("iPad", "Tablet", 768, 1024);
