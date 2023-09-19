﻿// <auto-generated />
using System;
using System.Collections.Generic;
using API.Models.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace API.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20230919140742_Initial")]
    partial class Initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("API.Models.Folk", b =>
                {
                    b.Property<int>("FolkKey")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("FolkKey"));

                    b.Property<string>("CityOrTownOfResidence")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<List<string>>("Connections")
                        .IsRequired()
                        .HasColumnType("text[]");

                    b.Property<string>("ContactInfo")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("CountryOfResidence")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("HomeCityOrTown")
                        .HasColumnType("text");

                    b.Property<string>("HomeCountry")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("PreferredContactMethod")
                        .HasColumnType("integer");

                    b.HasKey("FolkKey");

                    b.ToTable("Folks");
                });

            modelBuilder.Entity("API.Models.Request", b =>
                {
                    b.Property<int>("RequestKey")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("RequestKey"));

                    b.Property<DateTime>("DateSent")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("RecipientId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SenderId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("RequestKey");

                    b.ToTable("Requests");
                });
#pragma warning restore 612, 618
        }
    }
}
