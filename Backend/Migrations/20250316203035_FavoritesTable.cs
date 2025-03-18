using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EComm.Migrations
{
    /// <inheritdoc />
    public partial class FavoritesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "FavouritesId",
                table: "AspNetUsers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Favourites",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Favourites", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FavouriteProduct",
                columns: table => new
                {
                    FavouritesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FavouriteProduct", x => new { x.FavouritesId, x.ProductsId });
                    table.ForeignKey(
                        name: "FK_FavouriteProduct_Favourites_FavouritesId",
                        column: x => x.FavouritesId,
                        principalTable: "Favourites",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FavouriteProduct_Products_ProductsId",
                        column: x => x.ProductsId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_FavouritesId",
                table: "AspNetUsers",
                column: "FavouritesId");

            migrationBuilder.CreateIndex(
                name: "IX_FavouriteProduct_ProductsId",
                table: "FavouriteProduct",
                column: "ProductsId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Favourites_FavouritesId",
                table: "AspNetUsers",
                column: "FavouritesId",
                principalTable: "Favourites",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Favourites_FavouritesId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "FavouriteProduct");

            migrationBuilder.DropTable(
                name: "Favourites");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_FavouritesId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "FavouritesId",
                table: "AspNetUsers");
        }
    }
}
