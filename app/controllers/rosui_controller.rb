class RosuiController < ApplicationController

  def checkpoint
  end
  def teleop
    # render layout:false
      checkpoint
  end
  def index
    render layout:false
    teleop
    checkpoint
  end
end
