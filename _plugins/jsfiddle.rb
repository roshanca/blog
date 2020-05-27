# Title: jsFiddle tag for Jekyll
# Author: Brian Arnold (@brianarn)
# Update: Jungbin Kim
# Description:
#   Given a jsFiddle shortcode, outputs the jsFiddle iframe code.
#   Using 'default' will preserve defaults as specified by jsFiddle.
#
# Syntax: {% jsfiddle shorttag [tabs] [embedWay] [skin] [height] [width] %}
#
# Examples:
#
# Input: {% jsfiddle ccWP7 %}
# Output: <script async src=\"//jsfiddle.net/ccWP7/embed/js,resources,html,css,result/dark/"></script>
#
# Input: {% jsfiddle ccWP7 js,html,result iframe %}
# Output: <iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/ccWP7/embedded/js,html,result/light/"></iframe>
#

module Jekyll
  class JsFiddle < Liquid::Tag
    def initialize(tag_name, markup, tokens)
      if /(?<fiddle>\w+\/?\d?)(?:\s+(?<sequence>[\w,]+))?(?:\s+(?<embedWay>\w+))?(?:\s+(?<skin>\w+))?(?:\s+(?<height>\w+))?(?:\s+(?<width>\w+))?/ =~ markup
        @fiddle   = fiddle
        @sequence = (sequence unless sequence == 'default') || 'js,resources,html,css,result'
        @embedWay = (embedWay unless embedWay == 'default') || 'script'
        @skin     = (skin unless skin == 'default') || 'dark'
        @width    = width || '100%'
        @height   = height || '300px'
      end
    end

    def render(context)
      if @fiddle
        if @embedWay == 'iframe'
            "<iframe style=\"width: #{@width}; height: #{@height}\" src=\"//jsfiddle.net/#{@fiddle}/embedded/#{@sequence}/#{@skin}/\"></iframe>"
        else
            "<script async src=\"//jsfiddle.net/#{@fiddle}/embed/#{@sequence}/#{@skin}/\"></script>"
        end
      else
        "Error processing input, expected syntax: {% jsfiddle shorttag [tabs] [skin] [height] [width] %}"
      end
    end
  end
end

Liquid::Template.register_tag('jsfiddle', Jekyll::JsFiddle)
