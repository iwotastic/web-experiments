import html
from pathlib import Path
import subprocess
from shutil import rmtree, copytree
import json
import shlex
import time
from datetime import datetime

print("Setting up...")

container_path = Path(__file__).resolve().parent

dist_path = container_path / "dist"
exps_path = container_path / "experiments"

if dist_path.exists() and dist_path.is_dir():
    print("Removing old dist...")
    rmtree(dist_path)

dist_path.mkdir()

class ExpInfo:
    def __init__(self, dirname: str, name: str, desc: str):
        self.dirname = dirname
        self.name = name
        self.desc = desc

exp_compile_start_time = time.time()
exps_info = []

print("Finding experiment folders...")
for exp_path in exps_path.iterdir():
    if exp_path.is_dir():
        dirname = exp_path.name
        name = dirname
        description = "[No description given.]"

        print(f"Found folder {dirname}")

        exp_start_time = time.time()

        if (exp_path / "info.json").is_file():
            print("-- Found info.json, loading info...")

            info = {}
            build_path = exp_path

            with (exp_path / "info.json").open("r") as info_file:
                info = json.load(info_file)

            if "build" in info and "steps" in info["build"]:
                print("-- Found build info, processing...")

                for stepnum, step in enumerate(info["build"]["steps"]):
                    print(f"-- >>> START {stepnum + 1}: {step}")
                    subprocess.run(shlex.split(step), cwd=exp_path)

                    print("")
                    print(f"-- <<< DONE! {stepnum + 1}")
            
            print("-- Copying to dist folder...")
            copytree(build_path, dist_path / dirname)

            if "ignore" in info:
                print("-- Removing ignored files...")

                for ignored_file in info["ignore"]:
                    ignored_file: str = ignored_file
                    if (dist_path / dirname / ignored_file).is_file():
                        (dist_path / dirname / ignored_file).unlink()

                # Also ignore the info.json
                (dist_path / dirname / "info.json").unlink()

            print("-- Finalizing experiment metadata...")

            name = info["name"]
            description = info["description"]

        elif (exp_path / "package.json").is_file():
            print("-- Found package.json, building node project...")

            subprocess.run(["npm", "install"], cwd=exp_path)
            subprocess.run(["npm", "run", "build"], cwd=exp_path)

            print("")
            print("-- Moving results to dist folder...")

            (exp_path / "dist").replace(dist_path / dirname)

            print("-- Finalizing experiment metadata...")

            with (exp_path / "package.json").open("r") as package_file:
                package_obj = json.load(package_file)
                name = " ".join(
                    (word.capitalize() for word in package_obj["name"].split("-"))
                )
                description = package_obj["description"]
        else:
            print("-- No metadata files found, ignoring...")
            continue

        duration = time.time() - exp_start_time

        print(f"-- {name} built in {duration:.3f}s.")

        exps_info.append(ExpInfo(dirname, name, description))

print(f"Experiments built in {time.time() - exp_compile_start_time:.3f}s!")

print("Generating index.html...")
new_index_html = ""

def gen_exp_list():
    result = ""

    for exp in exps_info:
        result += f"<li><a href=\"/{exp.dirname}\">{html.escape(exp.name)}</a> &ndash; "
        result += html.escape(exp.desc)
        result += "</li>\n"

    return result

with (container_path / "index.html").open() as index_html_file:
    for line in index_html_file.readlines():
        if line.strip() == "<!-- Experiments -->":
            new_index_html += gen_exp_list()

        if line.strip() == "<!-- Date -->":
            new_index_html += datetime.today().astimezone().strftime("%b %d %Y")

        else:
            new_index_html += line

with (dist_path / "index.html").open("w") as index_html_file:
    index_html_file.write(new_index_html)

print("Done generating index.html!")
