// 首页/健康检查路由
import { Router } from "express";

const router = Router();

/* GET 健康检查 */
router.get("/", (req, res) => {
  res.json({ ok: true, service: "blog-backend", time: new Date().toISOString() });
});

export default router;
