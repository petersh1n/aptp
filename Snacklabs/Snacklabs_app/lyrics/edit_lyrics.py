from pptx import Presentation
from pathlib import Path
from Snacklabs_app.lyrics import get_lyrics

import json
import re
import os
#import keyboard
class slideWrite:
    def _prepare_lyrics_(self,
                            title,
                            ):
            loop = True
            while loop == True:
                title_for_bash = title.replace(" ", "\ ")
                self.get_lyrics.get_lyrics(song_title=title, artist_name="thisisnotanartistname")
                current_dir = Path(__file__).parent
                os.system(f"nano {current_dir}/lyrics/txt/{title_for_bash}.txt")
                loop = self.get_lyrics.get_lyrics(song_title=title, artist_name="thisisnotanartistname", print_it=False)

                if loop:
                    print()
                    print("Press <enter> to try again with text edit.")
                    print("Or press <again()> if you want to choose artist again.")
                    print("Or press <exit()> if you want to exit.")

                    real_break = False
                    key_input = "thisisnotaninput"
                    while key_input == "thisisnotaninput":
                        key_input = input(": ")

                        if key_input == "":
                            continue

                        elif key_input == "again()":
                            Path(f"{current_dir}/lyrics/txt/{title}.txt").unlink()
                            os.system("clear")

                        elif key_input == "exit()":
                            Path(f"{current_dir}/lyrics/txt/{title}.txt").unlink()
                            real_break = True
                            break

                        else:
                            key_input = "thisisnotaninput"
                            print("Invalid input. Try again.")

                    print()
                    if real_break: break

if __name__ == "__main__":
    sW = slideWrite(ppt_file = None,
                    layout_dict = None,
                    variable_list = None,
                    )
    sW._prepare_lyrics_("song_title")