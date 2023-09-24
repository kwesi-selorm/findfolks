using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class MakeConnectionsNavigationProp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Connections",
                table: "Folks");

            migrationBuilder.AddColumn<int>(
                name: "FolkId",
                table: "Folks",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Folks_FolkId",
                table: "Folks",
                column: "FolkId");

            migrationBuilder.AddForeignKey(
                name: "FK_Folks_Folks_FolkId",
                table: "Folks",
                column: "FolkId",
                principalTable: "Folks",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Folks_Folks_FolkId",
                table: "Folks");

            migrationBuilder.DropIndex(
                name: "IX_Folks_FolkId",
                table: "Folks");

            migrationBuilder.DropColumn(
                name: "FolkId",
                table: "Folks");

            migrationBuilder.AddColumn<List<string>>(
                name: "Connections",
                table: "Folks",
                type: "text[]",
                nullable: false);
        }
    }
}
