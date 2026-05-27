#!/bin/bash
# TNRocky Project Cleanup Script
# Safe to run - preserves all important files
# January 2026

set -e  # Exit on any error

PROJECT_ROOT="/Users/codyboring/CodyML/projects/TNRocky"

echo "=========================================="
echo "TNRocky Project Cleanup Script"
echo "=========================================="
echo ""

# Safety check - ensure we're in the right place
if [ ! -d "$PROJECT_ROOT/tennessee-starts-here" ]; then
    echo "ERROR: Production app not found at $PROJECT_ROOT/tennessee-starts-here"
    echo "Aborting to prevent accidental damage."
    exit 1
fi

echo "✓ Production app found"
echo ""

# Phase 1: Create new directory structure
echo "Phase 1: Creating new directories..."
mkdir -p "$PROJECT_ROOT/_archive"
mkdir -p "$PROJECT_ROOT/_reference"
mkdir -p "$PROJECT_ROOT/tennessee-starts-here/docs/almanac-specs"
echo "✓ Directories created"
echo ""

# Phase 2: Copy almanac specs to production docs
echo "Phase 2: Copying almanac specs..."
if [ -d "$PROJECT_ROOT/Weather" ]; then
    cp "$PROJECT_ROOT/Weather/rocky-mount-almanac-build-spec.md" "$PROJECT_ROOT/tennessee-starts-here/docs/almanac-specs/" 2>/dev/null || echo "  - build-spec.md not found (skipping)"
    cp "$PROJECT_ROOT/Weather/rocky-mount-almanac-location-addendum.md" "$PROJECT_ROOT/tennessee-starts-here/docs/almanac-specs/" 2>/dev/null || echo "  - location-addendum.md not found (skipping)"
    cp "$PROJECT_ROOT/Weather/rocky-mount-almanac-supplement.md" "$PROJECT_ROOT/tennessee-starts-here/docs/almanac-specs/" 2>/dev/null || echo "  - supplement.md not found (skipping)"
    echo "✓ Almanac specs copied"
else
    echo "  - Weather folder not found (skipping)"
fi
echo ""

# Phase 3: Archive TN250v2 prototype
echo "Phase 3: Archiving TN250v2 prototype..."
if [ -d "$PROJECT_ROOT/TN250v2" ]; then
    mv "$PROJECT_ROOT/TN250v2" "$PROJECT_ROOT/_archive/tn250-premium-prototype"
    echo "✓ TN250v2 archived"
else
    echo "  - TN250v2 not found (skipping)"
fi
echo ""

# Phase 4: Rename and move sample projects
echo "Phase 4: Organizing reference projects..."
if [ -d "$PROJECT_ROOT/sample projects/copy-of-rocky-mount---tennessee-starts-here (1)" ]; then
    mv "$PROJECT_ROOT/sample projects/copy-of-rocky-mount---tennessee-starts-here (1)" "$PROJECT_ROOT/_reference/sample-a-nav"
    echo "✓ Sample A renamed to sample-a-nav"
else
    echo "  - Sample A not found (skipping)"
fi

if [ -d "$PROJECT_ROOT/sample projects/rocky-mount---web--tennessee-starts-here---react (1)" ]; then
    mv "$PROJECT_ROOT/sample projects/rocky-mount---web--tennessee-starts-here---react (1)" "$PROJECT_ROOT/_reference/sample-b-seal"
    echo "✓ Sample B renamed to sample-b-seal"
else
    echo "  - Sample B not found (skipping)"
fi

# Remove empty sample projects folder if it exists and is empty
if [ -d "$PROJECT_ROOT/sample projects" ]; then
    rmdir "$PROJECT_ROOT/sample projects" 2>/dev/null && echo "✓ Empty 'sample projects' folder removed" || echo "  - 'sample projects' folder not empty (keeping)"
fi
echo ""

# Phase 5: Delete trash folders
echo "Phase 5: Removing trash folders..."

if [ -d "$PROJECT_ROOT/Weather2" ]; then
    rm -rf "$PROJECT_ROOT/Weather2"
    echo "✓ Weather2 deleted (was blank boilerplate)"
else
    echo "  - Weather2 not found (skipping)"
fi

if [ -d "$PROJECT_ROOT/Build Files" ]; then
    rm -rf "$PROJECT_ROOT/Build Files"
    echo "✓ Build Files deleted (was empty)"
else
    echo "  - Build Files not found (skipping)"
fi

if [ -d "$PROJECT_ROOT/_delete" ]; then
    rm -rf "$PROJECT_ROOT/_delete"
    echo "✓ _delete folder deleted (was marked as trash)"
else
    echo "  - _delete not found (skipping)"
fi

if [ -d "$PROJECT_ROOT/Weather" ]; then
    rm -rf "$PROJECT_ROOT/Weather"
    echo "✓ Weather deleted (specs already copied)"
else
    echo "  - Weather not found (skipping)"
fi
echo ""

# Phase 6: Verify final structure
echo "=========================================="
echo "Final Structure:"
echo "=========================================="
ls -la "$PROJECT_ROOT" | grep -v "\.DS_Store"
echo ""

echo "Production docs/almanac-specs:"
ls -la "$PROJECT_ROOT/tennessee-starts-here/docs/almanac-specs/" 2>/dev/null || echo "  (empty or not found)"
echo ""

echo "_reference contents:"
ls -la "$PROJECT_ROOT/_reference/" 2>/dev/null || echo "  (empty or not found)"
echo ""

echo "_archive contents:"
ls -la "$PROJECT_ROOT/_archive/" 2>/dev/null || echo "  (empty or not found)"
echo ""

echo "=========================================="
echo "Cleanup Complete!"
echo "=========================================="
echo ""
echo "Next step: Verify production app still builds"
echo "  cd $PROJECT_ROOT/tennessee-starts-here && npm run build"
echo ""
