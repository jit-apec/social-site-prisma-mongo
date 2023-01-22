"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    const user = yield prisma.user.create({
        data: {
            username: "raju",
            email: "raju@yopmail.com",
            password: "$2b$15$O3R.TH12fIJzYqvP0rlZzO6D/0EaIqHFaPYOwtv4bETRJmH0CD1vO",
            phone: "1234567890",
        }
    });
    // console.log(user.id);
    // await prisma.post.createMany({
    //     data: [
    //         {
    //             title: "what is blue diamond",
    //             description: "Color: Light Blue to Deep Blue\nRefractive index: 2.418 (at 500 nm)\nDensity: 3.5–3.53 g/cm3\nCategory: Native minerals\nCrystal class: Hexoctahedral (m3m); H-M symbol: (4/m 3 2/m)\nCrystal habit: Octahedral\nCrystal system: Cubic",
    //             content: "Blue diamond is a type of diamond which exhibits all of the same inherent properties of the mineral except with the additional element of blue color in the stone. They are colored blue by trace amounts of boron that contaminate the crystalline lattice structure.",
    //             image: "uploads\\1672981588804-Blue-Diamond-ART1.jpg",
    //             authorId: { connect: { id: user.id } }
    //         },
    //         {
    //             title: "what is black diamond",
    //             description: "Color: Typically black, can be grey, various shades of green and brown sometimes mottled\nCrystal habit: Polycrystalline\nCrystal system: Isometric-hexoctahedral (cubic)\nDensity: 3.5–3.53 g/cm3\nFormula mass: 12.01 u\nFracture: Irregular torn surfaces",
    //             content: "Carbonado, commonly known as black diamond, is one of the toughest forms of natural diamond. It is an impure, high-density, micro-porous form of polycrystalline diamond consisting of diamond, graphite, and amorphous carbon, with minor crystalline precipitates filling pores and occasional reduced metal inclusions",
    //             image: "uploads\\1672981976006-Blue-Diamond-ART1.jpg",
    //             authorId: { connect: { id: user.id } }
    //         },
    //         {
    //             title: "what is red diamond",
    //             description: "Color: Red\nDensity: 3.5–3.53 g/cm3\nCategory: Native minerals\nCleavage: 111 (perfect in four directions)\nCrystal class: Hexoctahedral (m3m); H-M symbol: (4/m 3 2/m)\nCrystal habit: Octahedral\nCrystal system: Cubic",
    //             content: "A red diamond is a diamond which displays red colour and exhibits the same mineral properties as colourless diamonds. Red diamonds are commonly known as the most expensive and the rarest diamond colour in the world, even more so than pink or blue diamonds, as very few red diamonds have been found",
    //             image: "uploads\\1672982126313-red dimong-1168748570-170667a.jpg",
    //             authorId: { connect: { id: user.id } }
    //         },
    //         {
    //             title: "what is green diamond",
    //             description: "Carat weight: 41\nCountry of origin: India\nColor: Natural green\nDiamond type: Type IIa\nDiscovered: Before 1722",
    //             content: "The Dresden Green Diamond, also known as the Dresden Green, is a 41-carat natural green diamond, originated in the mines of India. The Dresden Green is a rare Type IIa, with a clarity of VS1 and it is said to be potentially internally flawless, if slightly recut.",
    //             image: "uploads\\1672982312264-green-diamond-1625890677-5814848.jpeg",
    //             authorId: { connect: { id: user.id } }
    //         }
    //     ],
    // })
}))();
