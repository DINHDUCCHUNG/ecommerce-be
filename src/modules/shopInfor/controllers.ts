import { Request, Response } from "express";
import configs from "../../configs";
import ROLES from "../../constants/roles";
import { ShopInfor } from "../../entities/shopInfor";
import codes from "../../errors/codes";
import CustomError from "../../errors/customError";
import shopInforService from "./services";

const createOrUpdateShopInfor = async (req: Request, res: Response) => {
  const { bossName, email, facebook, zalo,bankAccountId,phone } = req.body;
//   const oldShopInfor =  shopInfor = await shopInforService
  // const currentUserId = req.user.id;
  const newShopInfor = new ShopInfor();
  newShopInfor.bossName = bossName;
  newShopInfor.email = email;
  newShopInfor.facebook = facebook;
  newShopInfor.zalo = zalo;
  newShopInfor.phone = phone;
  newShopInfor.bankAccountId = bankAccountId;
  const shopInfor = await shopInforService.createOrUpdateShopInfor(newShopInfor);
  res.status(200).json({
    status: "success",
    result: shopInfor,
  });
};



const getShopInfor = async (req: Request, res: Response) => {
  const { limit, offset } = req.query;
  const shopInfor = await shopInforService.getShopInfor();

  return res.status(200).json({
    status: "success",
    result: shopInfor[0]
  });
};

export default { createOrUpdateShopInfor, getShopInfor };