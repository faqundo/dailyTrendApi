import { expect } from "chai";
import { Feed } from "../domain/Feed";

describe("Modelo Feed", () => {
  it("Debe crear un feed correctamente", () => {
    const feed = new Feed({
      title: "Ejemplo",
      link: "https://ejemplo.com",
      source: "El País",
      publishedAt: new Date(),
    });

    expect(feed.title).to.equal("Ejemplo");
    expect(feed.link).to.equal("https://ejemplo.com");
    expect(feed.source).to.equal("El País");
  });
});
