# Generated by Django 5.1.2 on 2024-10-24 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("Snacklabs_app", "0003_section"),
    ]

    operations = [
        migrations.RenameField(
            model_name="lyrics",
            old_name="content",
            new_name="lyrics_text",
        ),
        migrations.RemoveField(
            model_name="lyrics",
            name="part",
        ),
        migrations.RemoveField(
            model_name="lyrics",
            name="title",
        ),
        migrations.AddField(
            model_name="lyrics",
            name="artist_name",
            field=models.CharField(default="Unknown Artist", max_length=255),
        ),
        migrations.AddField(
            model_name="lyrics",
            name="song_title",
            field=models.CharField(
                default="Unknown title", max_length=255, unique=True
            ),
        ),
    ]