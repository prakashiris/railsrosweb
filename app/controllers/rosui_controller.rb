class RosuiController < ApplicationController

layout false

  def _index
    render layout:false
    @coll = 'p1'
  end
  def teleop
    render layout:false
    @coll = 'p2'
  end
  def checkpoint
    render layout:false
    @coll = 'p3'
  end
  def _reading
    render layout:false
    @coll = 'p4'
  end

end
