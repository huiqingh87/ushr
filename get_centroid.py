import sys
import geopandas as gpd
import time

def main():
    # Check if at least one argument is provided
    if len(sys.argv) < 2:
        print("Usage: python get_centroid.py <shapefile path>")
        return

    # Get the argument passed through the command line
    fn = sys.argv[1]

    # Start measuring the execution time
    start_time = time.time()

    df = gpd.read_file(fn)
    df = df[df.evaluate == 'T']
    df['centroid_str'] = df.geometry.apply(lambda g: "%s,%s" % (g.centroid.x, g.centroid.y))

    try:
        df.to_csv(fn.replace(".shp", ".csv"), index=False)
        print("New CSV file with centroid coordinates is saved")
    except:
        print("ERROR OCCURRED")

    # Calculate and print the running time
    end_time = time.time()
    running_time = end_time - start_time
    print("Running time: %.2f seconds" % running_time)

if __name__ == "__main__":
    main()
