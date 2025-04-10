using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EComm.Migrations
{
    /// <inheritdoc />
    public partial class OrderItemCartItemRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CartItemId",
                table: "OrderItems",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_CartItemId",
                table: "OrderItems",
                column: "CartItemId",
                unique: true,
                filter: "[CartItemId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_CartItems_CartItemId",
                table: "OrderItems",
                column: "CartItemId",
                principalTable: "CartItems",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_CartItems_CartItemId",
                table: "OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_OrderItems_CartItemId",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "CartItemId",
                table: "OrderItems");
        }
    }
}
